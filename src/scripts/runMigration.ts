import { AppDataSource } from '../config/ormconfig';
import { CreateTeamTable1743520974699 } from '../migrations/1743520974699-CreateTeamTable';

async function runMigration() {
  try {
    await AppDataSource.initialize();
    const migration = new CreateTeamTable1743520974699();
    await migration.up(AppDataSource.createQueryRunner());
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  }
}

runMigration(); 