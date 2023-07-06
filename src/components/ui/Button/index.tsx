import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';
import styles from './styles.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?: boolean;

  // children é o que tem dentro do componente, como por exemplo o nome do botão <Button>Nome</Button>
  children: ReactNode;
}

export function Button({loading, children, ...props}: IButtonProps){
  return (
    <button
    className={styles.button}
    disabled={loading}
    {...props} // {...props} é o mesmo que type='submit' por exemplo, tudo que passar de props no botão a mais sera adicionado aqui
    >
      {loading ? (<FaSpinner color='#FFF' size={16}/>) : (
        <a className={styles.buttonText}>{children}</a>
      )}
    </button>
  )
}
