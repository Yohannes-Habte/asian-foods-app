import { createClient } from "contentful-management";

const SPACE_ID = import.meta.env.VITE_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_MGT_ACCESS_TOKEN;

const client = createClient({
  accessToken: ACCESS_TOKEN,
});

export const loginToContentful = async (email, password) => {
  // Simulate login process
  const isValidUser = email === email && password === password;

  if (!isValidUser) {
    throw new Error("Invalid credentials");
  }

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entries = await environment.getEntries({
    content_type: "user",
    limit: 1,
    skip: 0,
  });

  const userData = entries.items;

  return userData;
};
