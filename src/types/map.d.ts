export interface actionType {
  title: string;
  icon: string;
  state: boolean;
  function: (actionType) => void;
}
