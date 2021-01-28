import { Box, Button, Image, VStack } from "@chakra-ui/react";
import createFile from "app/files/mutations/createFile";
import getFiles from "app/files/queries/getFiles";
import { useMutation, usePaginatedQuery, useParam, useRouter } from "blitz";
import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ITEMS_PER_PAGE = 100;

const LeftSidebar: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number") as number;
  const page = Number(router.query.page) || 0;
  const [{ files, hasMore }] = usePaginatedQuery(getFiles, {
    where: { project: { id: projectId } },
    orderBy: { updatedAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const [createFileMutation] = useMutation(createFile);

  const onDrop = useCallback(async (acceptedFiles) => {
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const filesNode = () => {
    return (
      <VStack spacing={8}>
        {files.map((file) => {
          return (
            <Box
              as="button"
              key={file.id}
              bgColor="white"
              rounded="md"
              shadow="sm"
              borderWidth={1}
            >
              <VStack spacing={2}>
                <Image src={file.url} alt={file.name} />
              </VStack>
            </Box>
          );
        })}
      </VStack>
    );
  };
  return (
    <Box h="calc(100vh - 140px)" overflowY="scroll">
      <VStack spacing={8}>
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Button colorScheme="blue">Add a new image</Button>
          )}
        </Box>
        {filesNode()}
      </VStack>
    </Box>
  );
};

export default LeftSidebar;
