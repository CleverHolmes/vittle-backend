export default function isAdmin(roles: Array<string>) {
  return roles.indexOf("admin") >= 0;
}
