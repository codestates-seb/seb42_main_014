import Truncate from "react-text-truncate";

interface Props {
	text: string;
	limit: number;
}

const TextTruncate = ({ text, limit }: Props) => {
	return <Truncate truncateText="..." text={text} textTruncateChild={<></>} textElement="span" />;
};

export default TextTruncate;
