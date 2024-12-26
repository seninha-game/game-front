import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";

export const SkeletonLoading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="mx-auto mt-12">
      <Stack spacing={2} useFlexGap>
        <Card
          variant="soft"
          sx={{
            width: 65 / 100,
            maxWidth: 530,
            marginX: "auto",
            marginBottom: 20,
          }}
        >
          <AspectRatio ratio="21/9">
            <Skeleton loading={isLoading} variant="overlay"></Skeleton>
          </AspectRatio>
          <Typography>
            <Skeleton loading={isLoading}>
              {isLoading
                ? "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries."
                : "An aerial view of a road in the middle of a forest. This image was uploaded by Dian Yu on Unsplash."}
            </Skeleton>
          </Typography>
        </Card>
      </Stack>
    </div>
  );
};
