export default function Token() {
	const token = `Bearer${window.location.search.split("_")[1]}`;
	localStorage.setItem("accessToken", token);

	return <></>;
}
