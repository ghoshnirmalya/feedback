import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import createFile from "app/files/mutations/createFile";
import getFiles from "app/files/queries/getFiles";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import { invoke, useMutation, useParam, useQuery, useRouter } from "blitz";
import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdAdd } from "react-icons/md";

const ITEMS_PER_PAGE = 100;
const isDevelopmentEnvironment = process.env.NODE_ENV === "development";

const AddImageButton: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number") as number;
  const page = Number(router.query.page) || 0;
  const [createFileMutation, { isLoading }] = useMutation(createFile);
  const [isUploadingFile, setUploadingFile] = useState<Boolean>(false);
  const currentUser = useCurrentUser();
  const [{ files }] = useQuery(getFiles, {
    where: { id: projectId },
  });

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  // Allow only five files to be uploaded in production environment for now.
  if ((files.length === 5 && !isDevelopmentEnvironment) || !currentUser) {
    return null;
  }

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
