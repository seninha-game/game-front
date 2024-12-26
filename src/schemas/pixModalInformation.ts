import z from "zod";

export const pixInformationSchema = z.object({
  email: z.string().email("Digite um email válido"),
  name: z.string().min(5, "O nome deve conter no mínimo 5 caracteres"),
  contact: z
    .string()
    .min(15, "O número de telefone precisa ter 8 caracteres")
    .max(15),
  cpf: z.string().refine((cpf: string) => {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const cpfDigits = cpf.split("").map((el) => +el);
    const rest = (count: number): number => {
      return (
        ((cpfDigits
          .slice(0, count - 12)
          .reduce((soma, el, index) => soma + el * (count - index), 0) *
          10) %
          11) %
        10
      );
    };
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }, "Digite um cpf válido."),
});

export type PixInformationType = z.infer<typeof pixInformationSchema>;
