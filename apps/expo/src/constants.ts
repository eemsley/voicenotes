export const CLERK_PUBLISHABLE_KEY =
  "pk_test_bGVhZGluZy1zdW5maXNoLTU4LmNsZXJrLmFjY291bnRzLmRldiQ";
if (CLERK_PUBLISHABLE_KEY === undefined) {
  throw new Error("Please provide a Clerk publishable key in `constants.ts`");
}
