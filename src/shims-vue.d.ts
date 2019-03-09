declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

interface Todo {
  id: number;
  isCompleted: boolean;
  content: string | null;
  createdAt: number | null;
  completedAt: number | null;
}
