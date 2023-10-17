// @ts-nocheck
import { createTask, getTasks, updateTask, deleteTask } from "./services";

const mockFetch = (response: any) => {
  global.fetch = jest.fn().mockResolvedValue(response);
};

const cleanupFetch = () => {
  delete global.fetch;
};

describe("Services", () => {
  beforeAll(() => {
    mockFetch({ ok: true, json: () => ({ taskId: "123" }) });
  });

  afterAll(() => {
    cleanupFetch();
  });

  it("creates a task", async () => {
    const response = await createTask();
    expect(response.taskId).toBe("123");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/cards",
      expect.any(Object)
    );
  });

  it("fetches tasks", async () => {
    const response = await getTasks();
    expect(response).toEqual({ taskId: "123" });
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/cards",
      expect.any(Object)
    );
  });

  it("updates a task", async () => {
    const task = { taskId: "123", title: "Updated Task" };
    await updateTask("123", task);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/cards/123", {
      method: "PUT",
      headers: expect.any(Object),
      body: JSON.stringify(task),
    });
  });

  it("deletes a task", async () => {
    await deleteTask("123");

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/cards/123", {
      method: "DELETE",
      headers: expect.any(Object),
    });
  });
});
