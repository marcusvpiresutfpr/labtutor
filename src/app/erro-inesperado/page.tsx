import Link from "next/link";

const ErroInesperado = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-600">Erro Inesperado</h1>
      <p className="text-lg text-gray-700">
      Lamentamos informar que ocorreu um erro inesperado e não previsto durante o processamento da sua solicitação. Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte técnico para obter assistência adicional.
      </p>
      <Link href="/" className="text-blue-600 mt-4">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default ErroInesperado;
