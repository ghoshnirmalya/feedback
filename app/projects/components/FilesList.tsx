import { Box, Center, Image, Spinner, VStack } from "@chakra-ui/react";
import getFiles from "app/files/queries/getFiles";
import { getFileData } from "app/selectors/file";
import { setFile } from "app/slices/file";
import File from "app/types/file";
import { usePaginatedQuery, useParam, useRouter } from "blitz";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ITEMS_PER_PAGE = 100;

const FilesList: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "string") as string;
  const page = Number(router.query.page) || 0;
  const [{ files, hasMore }] = usePaginatedQuery(
    getFiles,
    {
      where: { project: { id: projectId } },
      orderBy: { updatedAt: "desc" },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
  const dispatch = useDispatch();
  const selectedFile = useSelector(getFileData());

  useEffect(() => {
    dispatch(setFile(files[0]));

    return () => {
      dispatch(setFile({}));
    };
  }, []);

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
            borderWidth={3}
            borderColor={
              file.id === selectedFile.id ? "yellow.500" : "gray.100"
            }
            boxSize="56px"
            onClick={() => handleClick(file)}
          >
            <Image
              src={file.thumbnailUrl}
              alt={file.name}
              objectFit="cover"
              boxSize="50px"
              maxW="unset"
              rounded="md"
              fallback={
                <Center p={2} boxSize="50px">
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
