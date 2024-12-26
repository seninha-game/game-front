import { IoMdTrendingUp } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { TbCircleNumber7 } from "react-icons/tb";
import { TbShoppingCartCheck } from "react-icons/tb";
import { FaClipboardCheck } from "react-icons/fa6";
import { HiOutlineTrophy } from "react-icons/hi2";
export const howToPlayTextsMockupSec1 = [
  {
    title: "ESCOLHA SEU BILHETE",
    text: "Navegue pelos tipos de bilhete e escolha o que mais te dá chances de ganhar.",
    description: "ticketType navigation",
    icon: IoTicketOutline,
  },
  {
    title: "ESCOLHA QUANTOS BILHETES",
    text: "Com opções de até 8 bilhetes por compra, você pode aumentar suas chances com rapidez e eficiência.",
    description: "choose ticket amount",
    icon: IoMdTrendingUp,
  },
  {
    title: "ESCOLHA SEUS NÚMEROS",
    text: "Você pode escolher manualmente os números de sua preferência, e também pode completar rapidamente com a opção de escolha rápida.",
    description: "choose ticket numbers",
    icon: TbCircleNumber7,
  },
  ,
];

export const howToPlayTextsMockupSec2 = [
  {
    title: "PAGUE PELOS BILHETES",
    text: "Prosseguindo para o fechamento do carrinho, preencha os dados necessários para o pagamento.",
    description: "",
    icon: TbShoppingCartCheck,
  },
  {
    title: "RECEBA SEUS BILHETES",
    text: "Após pagamento bem sucedido, você será informado que sua compra foi validada e já estará concorrendo ao próximo sorteio.",
    description: "",
    icon: FaClipboardCheck,
  },
  {
    title: "ASSISTA AO SORTEIO",
    text: "Navegue até a página de sorteio, e acompanhe ao vivo. O ganhador será pago de acordo com a preferência escolhida (pix ou carteira digital)",
    description: "",
    icon: HiOutlineTrophy,
  },
];
