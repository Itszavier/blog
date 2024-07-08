import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

export default async function Home() {
  return (
    <Box>
      <Box
        padding={{ md: "90px" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        height={"460px"}
        gap={"20px"}
      >
        <Heading as={"h3"} size={"lg"} textAlign={"center"}>
          OurCommunity - Your Community, Your Voice
        </Heading>
        <Text
          textAlign={"center"}
          w={{ md: "740px" }}
          color={"light.secondaryText"}
        >
          Discover and share what's happening in your community with our
          platform! Stay informed and connected by writing about local events,
          news, and stories. Follow fellow users to keep up with their updates
          and engage with the community by commenting on articles. Join us in
          creating a vibrant space for local voices and stories.
        </Text>

        <Button ml={"auto"} mr={"auto"} w={"fit-content"} colorScheme="blue">
          Get Started
        </Button>
      </Box>

      <Flex
        padding={"25px"}
        gap={"20px"}
        flexDirection={"column"}
        bg={"light.cardBackground"}
        width={"100%"}
      >
        <Flex
          w={"100%"}
          padding={"8px"}
          flexDirection={{ md: "column" }}
          gap={"16px"}
        >
          <Heading as={"h2"} textAlign={"left"}>
            Powerful Rich Text Editor
          </Heading>
          <Text w={{ md: "640px" }}>
            Our intuitive rich text editor makes writing and formatting your
            articles a breeze. With a wide range of styling options and media
            integration, you can focus on crafting compelling content without
            any distractions.
          </Text>
        </Flex>

        <List spacing={4} display={"flex"} flexDir={"row"}>
          <ListItem boxShadow={"md"} padding={"18px"}>
            <h2>Easy Formatting</h2>
            <p>Bold, italicize, underline, and more with a single click.</p>
          </ListItem>

          <ListItem boxShadow={"md"} padding={"18px"}>
            <h2>Media Integration</h2>
            <p>
              Embed images, videos, and other media directly into your articles.
            </p>
          </ListItem>

          <ListItem boxShadow={"md"} padding={"18px"}>
            <h2>Media Integration</h2>
            <p>
              Embed images, videos, and other media directly into your articles.
            </p>
          </ListItem>

          <ListItem boxShadow={"md"} padding={"18px"}>
            <h2>Live Preview</h2>
            <p>See how your article will look to your readers in real-time.</p>
          </ListItem>
        </List>
      </Flex>
    </Box>
  );
}
