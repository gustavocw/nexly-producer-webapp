// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import {
//   DialogActionTrigger,
//   DialogBody,
//   DialogCloseTrigger,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogRoot,
//   DialogTitle,
//   DialogTrigger,
// } from "components/ui/dialog";

// interface ModalStateModuleProps {
//   _id: string;
// }

// const ModalStateModule: React.FC<ModalStateModuleProps> = ({ _id }) => {


//   const { mutate: mutateModule } = useMutation({
//     mutationFn: (params: NewModule) => createModule(idProduct, params),
//     onSuccess: () => {
//       toaster.create({
//         title: "Módulo criado com sucesso!",
//         type: "success",
//       });
//       refetchCourse();
//     },
//   });


//   return (
//     <DialogRoot role="alertdialog">
//       <DialogTrigger asChild>
//         <Button variant="outline" size="sm">
//           Open Dialog
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are you sure?</DialogTitle>
//         </DialogHeader>
//         <DialogBody>
//           <p>
//             This action cannot be undone. This will permanently delete your
//             account and remove your data from our systems.
//           </p>
//         </DialogBody>
//         <DialogFooter>
//           <DialogActionTrigger asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogActionTrigger>
//           <Button onClick={onClick} colorPalette="red">Delete</Button>
//         </DialogFooter>
//         <DialogCloseTrigger />
//       </DialogContent>
//     </DialogRoot>
//   );
// };

// export default ModalStateModule;
