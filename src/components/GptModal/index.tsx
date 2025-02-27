import { Button, Stack, Textarea } from "@chakra-ui/react";
import Btn from "components/button/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Field } from "components/ui/field";
import useGPTChat from "hooks/useGpt";
import { useRef, useState, useEffect } from "react";

interface ModalGptProps {
  help: string;
  titleModal: string;
  onConfirm: (response: { title: string; description: string }) => void;
}

const ModalGpt = ({ help, onConfirm, titleModal }: ModalGptProps) => {
  const { mutate, isPending } = useGPTChat();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [formattedText, setFormattedText] = useState("");
  const [generatedData, setGeneratedData] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [buttonLabel, setButtonLabel] = useState("Gerar");
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = () => {
    if (!formattedText.trim()) return;
    const prompt = `${help}\nUsuário: ${formattedText}`;

    mutate(prompt, {
      onSuccess: (response) => {
        try {
          const data = JSON.parse(response);
          setGeneratedData(data);
          setFormattedText(
            `Título: ${data.title}\n\nDescrição:\n${data.description}`
          );
          setButtonLabel("Confirmar");
        } catch (error) {
          console.error("Erro ao processar resposta da IA:", error);
        }
      },
    });
  };

  const handleConfirm = () => {
    if (generatedData) {
      onConfirm(generatedData);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (
      !generatedData ||
      formattedText !==
        `Título: ${generatedData.title}\n\nDescrição:\n${generatedData.description}`
    ) {
      setButtonLabel("Gerar");
    }
  }, [formattedText, generatedData]);

  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      onOpenChange={(value) => setIsOpen(value.open)}
      initialFocusEl={() => ref.current}
    >
      <DialogTrigger asChild>
        <Button
          px={2}
          color="neutral"
          _hover={{ bg: "neutral.60" }}
          _active={{ bg: "neutral.60" }}
          _pressed={{ bg: "neutral.60" }}
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          Gerar com IA
        </Button>
      </DialogTrigger>
      <DialogContent bg="neutral.60" color="neutral" p={4}>
        <DialogHeader>
          <DialogTitle mb={5}>{titleModal}</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field>
              <Textarea
                ref={ref}
                placeholder="Digite aqui a descrição..."
                value={formattedText}
                onChange={(e) => setFormattedText(e.target.value)}
                minH="150px"
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Btn
              w="100px"
              label="Cancelar"
              bg="transparent"
              onClick={() => setIsOpen(false)}
            />
          </DialogActionTrigger>
          <Btn
            isLoading={isPending}
            w="100px"
            label={buttonLabel}
            onClick={buttonLabel === "Gerar" ? handleGenerate : handleConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ModalGpt;
