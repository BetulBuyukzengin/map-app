import { Button } from "@chakra-ui/react";
interface GetCurrentPositionButtonProps {
  getCurrentPosition: () => void;
}
function GetCurrentPositionButton({
  getCurrentPosition,
}: GetCurrentPositionButtonProps) {
  return (
    <div className="w-full flex justify-center absolute bottom-5">
      <Button
        onClick={getCurrentPosition}
        className="bg-slate-600 
       
         text-slate-200 hover:text-slate-300 
         px-5 py-4 z-[1000] rounded-md 
         
          bottom-5 "
      >
        Get Current Position
      </Button>
    </div>
  );
}

export default GetCurrentPositionButton;
