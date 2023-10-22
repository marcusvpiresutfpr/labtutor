"use client";

type InputTitleProps = {
  title?: string;
  onChange?: (title: string) => void;
};

const InputTitle: React.FunctionComponent<InputTitleProps> = ({
  title = "",
  onChange = Function,
}) => {
  
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Escreva o título do artigo aqui"
      className="input input-bordered input-lg w-full my-2"
      value={title}
      onChange={handleTitle}
    />
  );
};

export default InputTitle;
