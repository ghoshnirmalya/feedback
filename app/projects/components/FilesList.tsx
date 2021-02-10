import { Box, Center, Image, Spinner, VStack } from "@chakra-ui/react";
import getFiles from "app/files/queries/getFiles";
import { setFile } from "app/slices/file";
import File from "app/types/file";
import { usePaginatedQuery, useParam, useRouter } from "blitz";
import React, { FC } from "react";
import { useDispatch } from "react-redux";

const ITEMS_PER_PAGE = 100;

const FilesList: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "string") as string;
  const page = Number(router.query.page) || 0;
  const [{ files, hasMore }] = usePaginatedQuery(getFiles, {
    where: { project: { id: projectId } },
    orderBy: { updatedAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const dispatch = useDispatch();

  if (!files.length) {
    return null;
  }

  const handleClick = (file: File) => {
    dispatch(setFile(file));
  };

  return (
    <VStack spacing={4}>
      {files.map((file) => {
        return (
          <Box
            as="button"
            key={file.id}
            bgColor="white"
            rounded="md"
            borderWidth={1}
            onClick={() => handleClick(file)}
          >
            <Image
              src={file.url}
              alt={file.name}
              objectFit="cover"
              boxSize="50px"
              rounded="md"
              fallback={
                <Center p={4} boxSize="50px">
                  <Spinner />
                </Center>
              }
            />
          </Box>
        );
      })}
    </VStack>
  );
};

export default FilesList;
