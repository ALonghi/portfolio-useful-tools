import {useDropzone} from 'react-dropzone';

import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isFocused) {
        return '#2196f3';
    }
    return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 12rem;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function DropBox({onDrop}) {
    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        open,
        isDragAccept,
        isFocused,
        isDragReject,
    } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    const lists = acceptedFiles.map((list) => (
        <li key={list.name}>
            {list.name} - {list.size} bytes
        </li>
    ));

    return (
        <>
            <section className="dropbox ">
                <Container
                    className="dropbox !px-4 w-full mx-auto"
                    {...getRootProps({isDragAccept, isFocused, isDragReject})}
                >
                    <input {...getInputProps()} />
                    <p className={`font-light w-8/12 text-lg`}>Drag 'n' drop some files here</p>
                    <button type="button"
                            className="font-normal text-left btn mt-4 text-xl "
                            onClick={open}>
                        Click to select file(s)
                    </button>
                </Container>
            </section>
            {lists?.length > 0 &&
                <aside>
                  <p className={`ml-4 font-light mt-3 mb-8 text-lg`}>Uploaded {lists?.length} files</p>
                </aside>
            }
        </>
    );
}

export default DropBox;