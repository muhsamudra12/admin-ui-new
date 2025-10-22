const city = "Jakarta";
const street = "Jl Kebon Jeruk";

// Versi Promise
export const getUsersPromise = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) =>
      data.map((user) => ({
        name: user.name,
        email: user.email,
      }))
    );
};

// Versi Async/Await
export const getUsersAsync = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data.map((user) => ({
    name: user.name,
    email: user.email,
    street,
    city,
  }));
};
