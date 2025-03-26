import { DockerComposeEnvironment, StartedDockerComposeEnvironment, getContainerRuntimeClient } from "testcontainers";
import { healthCheck } from './features/health.subtest';
import { loginFlow } from './features/login.subtest';
describe('SplitMan By Shatmari', () => {

  let environment = new DockerComposeEnvironment(".", "docker-compose.yml");
  let startedEnvironment:StartedDockerComposeEnvironment;
  let host:string;
  let port:number;

  beforeAll(async () => {
    startedEnvironment = await environment.up(['app'])
    const container = await startedEnvironment.getContainer('app');
    host = await container.getHost();
    port = await container.getMappedPort(3000);
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
  

});
