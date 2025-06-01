import { REPO_URL } from "@/app/constant";
import { chunks } from "../format";
import { SyncStore } from "@/app/store/sync";

export type GistConfig = SyncStore["gist"] & { gistId: string };
export type GistClient = ReturnType<typeof createGistClient>;

export function createGistClient(store: SyncStore) {
  let gistId = store.gist.username;
  const token = store.gist.token;
  const fileBackup = store.gist.filename.trim();
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "UTC+8",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // a proxy disable for a tmp since github doesn't need proxy url
  const proxyUrl =
    store.useProxy && store.proxyUrl.length > 0 ? store.proxyUrl : undefined;

  return {
    async create(content: string) {
      const description = `[200 OK] [GithubSync] Last Sync: ${currentDate} Site: ${REPO_URL}`;

      const contentChunks = [...chunks(content)];
      const files: { [key: string]: { content: string } } = {};

      for (let i = 0; i < contentChunks.length; i++) {
        const fileName = i === 0 ? fileBackup : `${fileBackup}_${i}`;
        files[fileName] = {
          content: contentChunks[i],
        };
      }

      return await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify({
          public: false,
          description,
          files,
        }),
      })
        .then((res) => {
          console.log(
            "[Gist] Create A File Name",
            `${fileBackup}`,
            res.status,
            res.statusText,
          );
          if (res.status === 201) {
            return res.json().then((data) => {
              gistId = data.id; // Update the gistId with the new Gist ID
              return gistId;
            });
          }
          return null;
        })
        .catch((error) => {
          console.error("[Gist] Create A File Name", `${fileBackup}`, error);
          return null;
        });
    },

    async check(): Promise<string> {
      const res = await fetch(this.path(gistId), {
        method: "GET",
        headers: this.headers(),
      });

      console.log("[Gist] Check A File Name", res.status, res.statusText);

      if (res.status === 200) {
        return "success"; // Return success if the Gist exists
      } else if (res.status === 404) {
        return "failed"; // Return failed if the Gist doesn't exist
      }

      return ""; // Return an empty string for other cases
    },

    async get() {
      const res = await fetch(this.path(gistId), {
        method: "GET",
        headers: this.headers(),
      });

      console.log(
        "[Gist] Get A File Name",
        `${fileBackup}`,
        res.status,
        res.statusText,
      );

      if (res.status === 200) {
        const data = await res.json();
        // 收集所有分片
        const files = data.files;
        console.log("[Gist] Files in Gist:", Object.keys(files));
        let content = "";
        let i = 0;
        while (true) {
          const name = i === 0 ? fileBackup : `${fileBackup}_${i}`;
          if (files[name]?.content !== undefined) {
            content += files[name].content;
            i++;
          } else {
            break;
          }
        }
        console.log("[Gist] Get Content", `${content}`);
        return content;
      }

      return "";
    },

    async set(key: string, data: string) {
      const checkResult = await this.check();
      const contentChunks = [...chunks(data)];
      const description = `[Sync] [200 OK] [GithubGist] Last Sync: ${currentDate} Site: ${REPO_URL}`;
      const files: { [key: string]: { content: string } | null } = {};

      // 添加所有分片
      for (let i = 0; i < contentChunks.length; i++) {
        const fileName = i === 0 ? fileBackup : `${fileBackup}_${i}`;
        files[fileName] = { content: contentChunks[i] };
      }

      if (checkResult === "success") {
        // PATCH 更新
        return fetch(this.path(gistId), {
          method: "PATCH",
          headers: this.headers(),
          body: JSON.stringify({ description, files }),
        }).then((res) => data);
      } else {
        // 创建新 gist
        const newGistId = await this.create(data);
        if (newGistId) gistId = newGistId;
        return data;
      }
    },

    headers() {
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    },

    path(gistId: string) {
      return `https://api.github.com/gists/${gistId}`;
    },
  };
}
