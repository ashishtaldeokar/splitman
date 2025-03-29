import { DockerComposeEnvironment, StartedDockerComposeEnvironment, getContainerRuntimeClient } from "testcontainers";
import { healthCheck } from './features/health.subtest';
import { getUsersFlow, loginFlow } from './features/login.subtest';
describe('E2E test for SplitMan By Shatmari', () => {

  let environment = new DockerComposeEnvironment(".", "docker-compose.yml");
  let startedEnvironment:StartedDockerComposeEnvironment;
  let host:string;
  let port:number;

  beforeAll(async () => {
    startedEnvironment = await environment.up(['app', 'postgresdb'])
    const container = await startedEnvironment.getContainer('app');
    host = await container.getHost();
    port = await container.getMappedPort(3000);
    const postgresContainer = await startedEnvironment.getContainer('postgresdb');
    const postgresHost = await postgresContainer.getHost();
    const postgresPort = await postgresContainer.getMappedPort(5432);
    process.env.DATABASE_URL = `postgresql://postgres:postgres@${postgresHost}:${postgresPort}/postgres`;
    console.log(process.env.DATABASE_URL);
}, 60000);

  afterAll(async () => {
    await startedEnvironment.down();
  }, 60000);

  // Health Check Flow
  describe('Health Check Flow', () => {
    it('should return 200 for the health endpoint', async () => {
      healthCheck(host, port);
    });
  });

  describe('Login Flow', () => {
    it('should return 200 for the login endpoint', async () => {
      loginFlow(host, port);
    });
  });

  describe('Get Users Flow', () => {
    it('should return 200 for the get users endpoint', async () => {
      getUsersFlow(host, port);
    });
  });
  

});
