import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import createFile from "app/files/mutations/createFile";
import getFiles from "app/files/queries/getFiles";
import { invoke, useMutation, useParam, useRouter } from "blitz";
import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdAdd, MdPlusOne } from "react-icons/md";

const ITEMS_PER_PAGE = 100;

const AddImageButton: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number") as number;
  const page = Number(router.query.page) || 0;
  const [createFileMutation, { isLoading }] = useMutation(createFile);
  const [isUploadingFile, setUploadingFile] = useState<Boolean>(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploadingFile(true);

    let formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { name, url } = await response.json();

    try {
      await createFileMutation({
        data: { name, url },
        projectId,
      });

      const files = await invoke(getFiles, {
        where: { project: { id: projectId } },
        orderBy: { updatedAt: "desc" },
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploadingFile(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (isUploadingFile || isLoading) {
    return (
      <Center
        boxSize="50px"
        shadow="sm"
        rounded="md"
        borderWidth={1}
        borderStyle="dashed"
      >
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex
      {...getRootProps()}
      boxSize="50px"
      shadow="sm"
      rounded="md"
      borderWidth={1}
      justifyContent="center"
      alignItems="center"
      fontWeight="bold"
      borderStyle="dashed"
      _hover={{
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Box>
          <MdAdd size={24} />
        </Box>
      )}
    </Flex>
  );
};

export default AddImageButton;
