// components/DeleteButton.jsx
import { Button } from "@nextui-org/react";

export const DeleteButton = ({ onClick }) => {
  return (
    <Button color="error" onClick={onClick} ghost>
      Delete
    </Button>
  );
};