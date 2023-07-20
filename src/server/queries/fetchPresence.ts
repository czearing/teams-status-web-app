export const fetchPresence = async () => {
  const res = await fetch(`/api/graph/presence`, {
    method: "GET",
  });
  const data = await res.json();

  return data;
};
