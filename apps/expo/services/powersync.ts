import { PowerSyncDatabase } from "@journeyapps/powersync-sdk-react-native";
import { AbstractPowerSyncDatabaseOpenFactory } from "@journeyapps/powersync-sdk-web";
=
export const powerSyncFactory = new AbstractPowerSyncDatabaseOpenFactory({
  schema: [
    `CREATE TABLE IF NOT EXISTS editor_contents (
      id TEXT PRIMARY KEY,
      html_content TEXT NOT NULL,
      text_content TEXT NOT NULL,
      json_content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      _status TEXT DEFAULT 'synced'
    );`,
  ],
  dbFilename: "editor.db",
});

export const powerSync = powerSyncFactory.getInstance();

export const initPowerSync = async () => {
  await powerSync.init();
  await powerSync.connect();
};
