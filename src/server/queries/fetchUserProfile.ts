export const fetchUserProfile = async () => {
  const res = await fetch(`/api/graph/user-profile`, {
    method: "GET",
  });
  const data = await res.json();

  return data;
};
