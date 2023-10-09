export const useResizeTypeArea = () =>{

    const resizeArea = (element, oneLineHeightDefault) => {

        element.current.style.height = `${oneLineHeightDefault}px`;
        element.current.style.height = `${element.current.scrollHeight}px`;

    }

    return {resizeArea}
}