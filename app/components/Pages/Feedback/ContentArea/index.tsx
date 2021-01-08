import { Box } from "@chakra-ui/react"
import React, { FC, useState } from "react"

const ContentArea: FC = () => {
  const [annotation, setAnnotation] = useState({ x: 0, y: 0 })

  const handleClick = (e) => {
    // Calcualate co-ordinates in percentages in order to support responsive mode
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.x
    const offsetY = e.clientY - rect.y

    setAnnotation({
      x: (offsetX / rect.width) * 100,
      y: (offsetY / rect.height) * 100,
    })
  }

  return (
    <Box h="calc(100vh - 50px)" w="calc(100vw - 300px)" p={14} overflow="hidden">
      <Box shadow="xl" overflowY="auto" mx="auto">
        <div
          style={{
            position: "relative",
          }}
        >
          <img src="/images/demo.png" width="100%" />
          <div
            id="js-image"
            onClick={handleClick}
            style={{
              position: "absolute",
              inset: "0px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: `${annotation.y}%`,
                left: `${annotation.x}%`,
                width: "10px",
                height: "10px",
                backgroundColor: "red",
              }}
            />
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default ContentArea
