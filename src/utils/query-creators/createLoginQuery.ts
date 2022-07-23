export const createLoginQuery = (username: string, password: string) => `mutation {
	login(username:"${username}", password:"${password}") {
	  username,
	  password,
	  token
	}
  }`