export default function({ store, redirect }) {
  const currentUser = store.state.auth.user;

  if (currentUser && currentUser.roles) {
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }
  return redirect("/login");
}
