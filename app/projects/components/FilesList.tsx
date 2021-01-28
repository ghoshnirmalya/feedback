import { Box, Center, Image, Spinner, VStack } from "@chakra-ui/react";
import getFiles from "app/files/queries/getFiles";
import { usePaginatedQuery, useParam, useRouter } from "blitz";
import React, { FC } from "react";

const ITEMS_PER_PAGE = 100;

const FilesList: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number") as number;
  const page = Number(router.query.page) || 0;
  const [{ files, hasMore }] = usePaginatedQuery(getFiles, {
    where: { project: { id: projectId } },
    orderBy: { updatedAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  if (!files.length) {
    return null;
  }

  return (
    <VStack spacing={8}>
      {files.map((file) => {
        return (
          <Box
            as="button"
            key={file.id}
            bgColor="white"
            shadow="sm"
            rounded="md"
            borderWidth={1}
          >
            <VStack spacing={2}>
              <Image
                src={file.url}
                alt={file.name}
                objectFit="cover"
                boxSize="100px"
                rounded="md"
                fallback={
                  <Center p={4} boxSize="100px">
                    <Spinner />
                  </Center>
                }
              />
            </VStack>
          </Box>
        );
      })}
    </VStack>
  );
};

export default FilesList;
