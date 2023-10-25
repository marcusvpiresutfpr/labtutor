import Link from "next/link";

const NotAllowedPage = () => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Acesso Restrito</h1>
        <p className="py-6">
          Faça o login para continuar ou entre em contato se já estiver logado e
          o erro persistir.
        </p>
        <Link href="/" className="btn btn-primary">
          VOLTAR PARA O INÍCIO
        </Link>
      </div>
    </div>
  </div>
);

export default NotAllowedPage;
