import { AppDataSource } from '../config/ormconfig';
import { RenameSenhaToPassword1743520549941 } from '../migrations/1743520549941-RenameSenhaToPassword';

async function runMigration() {
  try {
    await AppDataSource.initialize();
    const migration = new RenameSenhaToPassword1743520549941();
    await migration.up(AppDataSource.createQueryRunner());
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  }
}

runMigration(); 