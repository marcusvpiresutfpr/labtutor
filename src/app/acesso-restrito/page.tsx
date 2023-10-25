import Link from "next/link";

const NotAllowedPage = () => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold color-red py-6">Acesso Restrito</h1>
        <Link href="/" className="btn btn-primary">
          VOLTAR PARA O INÍCIO
        </Link>
      </div>
    </div>
  </div>
);

export default NotAllowedPage;
