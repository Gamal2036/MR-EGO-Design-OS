"use client";

import {
  ArrowRight,
  Bell,
  Mail,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";

import { AIMessage } from "@/components/ai/ai-message";
import { ConfidenceBadge } from "@/components/ai/confidence-badge";
import { RecommendationCard } from "@/components/ai/recommendation-card";
import { ThinkingIndicator } from "@/components/ai/thinking-indicator";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  ErrorState,
  LoadingState,
  ProgressBar,
  Skeleton,
  SkeletonGroup,
} from "@/components/feedback";
import {
  Checkbox,
  FieldError,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  SearchInput,
  Switch,
  Textarea,
} from "@/components/forms";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Chip,
  Divider,
  IconButton,
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
  Surface,
  TooltipWrapper,
} from "@/components/foundation";
import {
  Container,
  ContentBlock,
  Grid,
  PageHeader,
  Section,
  Stack,
} from "@/components/layout-primitives";

function Spacing() {
  return <div className="h-8" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-heading-2 text-primary mb-4 mt-8 first:mt-0">
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-heading-4 text-secondary mb-3">{children}</h3>;
}

export default function DevComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Container>
      <PageHeader
        title="Component Preview"
        description="DP-14 Foundation Components — internal development preview"
      />

      <SectionTitle>Core Components</SectionTitle>

      <Grid columns={2} gap={6}>
        <ContentBlock title="Buttons" variant="card">
          <Stack gap={3}>
            <SubTitle>Variants</SubTitle>
            <Stack direction="row" gap={2} wrap="wrap">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="link">Link</Button>
              <Button variant="outline-danger">Outline Danger</Button>
            </Stack>
            <SubTitle>Sizes</SubTitle>
            <Stack direction="row" gap={2} align="center" wrap="wrap">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
            </Stack>
            <SubTitle>States</SubTitle>
            <Stack direction="row" gap={2} wrap="wrap">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button leftIcon={<Mail className="h-4 w-4" />}>
                With Icon
              </Button>
              <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                Right Icon
              </Button>
            </Stack>
          </Stack>
        </ContentBlock>

        <ContentBlock title="Icon Buttons" variant="card">
          <Stack gap={3}>
            <SubTitle>Variants</SubTitle>
            <Stack direction="row" gap={2} wrap="wrap">
              <IconButton icon={Settings} variant="primary" label="Settings" />
              <IconButton
                icon={Bell}
                variant="secondary"
                label="Notifications"
              />
              <IconButton icon={User} variant="ghost" label="User" />
              <IconButton icon={Search} variant="outline" label="Search" />
              <IconButton icon={Mail} variant="danger" label="Messages" />
            </Stack>
            <SubTitle>Sizes</SubTitle>
            <Stack direction="row" gap={2} align="center" wrap="wrap">
              <IconButton icon={Settings} size="xs" label="XS" />
              <IconButton icon={Settings} size="sm" label="SM" />
              <IconButton icon={Settings} size="md" label="MD" />
              <IconButton icon={Settings} size="lg" label="LG" />
              <IconButton icon={Settings} size="xl" label="XL" />
            </Stack>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={2} gap={6}>
        <ContentBlock title="Badges" variant="card">
          <Stack gap={3}>
            <Stack direction="row" gap={2} wrap="wrap">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ai">AI</Badge>
            </Stack>
            <Stack direction="row" gap={2} align="center" wrap="wrap">
              <Badge size="xs">XS</Badge>
              <Badge size="sm">SM</Badge>
              <Badge size="md">MD</Badge>
              <Badge size="lg">LG</Badge>
            </Stack>
          </Stack>
        </ContentBlock>

        <ContentBlock title="Chips" variant="card">
          <Stack gap={3}>
            <Stack direction="row" gap={2} wrap="wrap">
              <Chip variant="primary">Primary</Chip>
              <Chip variant="neutral">Neutral</Chip>
              <Chip variant="success">Success</Chip>
              <Chip variant="ai">AI</Chip>
            </Stack>
            <Stack direction="row" gap={2} wrap="wrap">
              <Chip variant="primary" removable>
                Removable
              </Chip>
              <Chip variant="neutral" removable onRemove={() => {}}>
                Dismiss
              </Chip>
            </Stack>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={2} gap={6}>
        <ContentBlock title="Cards" variant="card">
          <Stack gap={3}>
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>
                  This is a default card with description.
                </CardDescription>
              </CardHeader>
              <CardContent>Card content area.</CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
            <Card variant="elevated" padding="md">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>
                  Card with elevated shadow.
                </CardDescription>
              </CardHeader>
              <CardContent>Content with hover shadow effect.</CardContent>
            </Card>
            <Card variant="interactive" padding="md">
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Hover over this card.</CardDescription>
            </Card>
          </Stack>
        </ContentBlock>

        <ContentBlock title="Surfaces and Panels" variant="card">
          <Stack gap={3}>
            <SubTitle>Surface Levels</SubTitle>
            <div className="grid grid-cols-2 gap-3">
              <Surface
                level={0}
                border="default"
                shadow="soft"
                className="p-4"
              >
                <p className="text-body text-center">Surface 0</p>
              </Surface>
              <Surface
                level={1}
                border="default"
                shadow="soft"
                className="p-4"
              >
                <p className="text-body text-center">Surface 1</p>
              </Surface>
              <Surface level={2} border="default" className="p-4">
                <p className="text-body text-center">Surface 2</p>
              </Surface>
              <Surface level={3} border="default" className="p-4">
                <p className="text-body text-center">Surface 3</p>
              </Surface>
            </div>
            <SubTitle>Panel</SubTitle>
            <Panel variant="default" padding="md">
              <PanelHeader action={<Button size="sm">Edit</Button>}>
                Panel Header
              </PanelHeader>
              <PanelBody>
                Panel body content with description.
              </PanelBody>
              <PanelFooter>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </PanelFooter>
            </Panel>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={2} gap={6}>
        <ContentBlock title="Dividers" variant="card">
          <Stack gap={4}>
            <p className="text-body">Content above divider</p>
            <Divider />
            <p className="text-body">Content below divider</p>
            <Divider label="Or continue with" />
            <p className="text-body">Labeled divider above</p>
            <div className="flex h-20 gap-4 items-center">
              <span className="text-body">Left</span>
              <Divider orientation="vertical" />
              <span className="text-body">Right</span>
            </div>
          </Stack>
        </ContentBlock>

        <ContentBlock title="Avatars" variant="card">
          <Stack gap={3}>
            <Stack direction="row" gap={3} align="center" wrap="wrap">
              <Avatar src="" initials="JD" size="xs" />
              <Avatar src="" initials="JD" size="sm" />
              <Avatar src="" initials="JD" size="md" />
              <Avatar src="" initials="JD" size="lg" />
              <Avatar src="" initials="JD" size="xl" />
              <Avatar src="" initials="JD" size="2xl" />
            </Stack>
            <Stack direction="row" gap={3} align="center" wrap="wrap">
              <Avatar size="sm" />
              <Avatar size="md" fallback="U" />
            </Stack>
            <SubTitle>Avatar Group</SubTitle>
            <AvatarGroup size="sm">
              <Avatar initials="AL" />
              <Avatar initials="BM" />
              <Avatar initials="CK" />
              <Avatar initials="DJ" />
              <Avatar initials="ER" />
            </AvatarGroup>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <ContentBlock title="Tooltips" variant="card" padding>
        <Stack direction="row" gap={4} wrap="wrap">
          <TooltipWrapper content="Top tooltip" side="top">
            <Button variant="outline" size="sm">
              Top
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Bottom tooltip" side="bottom">
            <Button variant="outline" size="sm">
              Bottom
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Left tooltip" side="left">
            <Button variant="outline" size="sm">
              Left
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Right tooltip" side="right">
            <Button variant="outline" size="sm">
              Right
            </Button>
          </TooltipWrapper>
        </Stack>
      </ContentBlock>

      <SectionTitle>Form Components</SectionTitle>

      <Grid columns={2} gap={6}>
        <ContentBlock title="Inputs" variant="card">
          <Stack gap={3}>
            <Input placeholder="Default input" />
            <Input placeholder="Small input" size="sm" />
            <Input placeholder="Large input" size="lg" />
            <Input placeholder="Disabled input" disabled />
            <Input placeholder="With error" hasError />
            <SearchInput placeholder="Search input..." />
          </Stack>
        </ContentBlock>

        <ContentBlock title="Textarea and Select" variant="card">
          <Stack gap={4}>
            <SubTitle>Textarea</SubTitle>
            <Textarea placeholder="Default textarea" />
            <Textarea placeholder="With error" hasError />
            <SubTitle>Checkboxes</SubTitle>
            <Checkbox label="Default checkbox" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <SubTitle>Switches</SubTitle>
            <Switch
              label="Toggle me"
              checked={switchOn}
              onCheckedChange={setSwitchOn}
            />
            <Switch label="Disabled" disabled />
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={2} gap={6}>
        <ContentBlock title="Form Field" variant="card">
          <Stack gap={4}>
            <FormField name="email" hasError={false}>
              <FormLabel required>Email</FormLabel>
              <Input placeholder="Enter your email" />
              <FormDescription>
                We will never share your email.
              </FormDescription>
            </FormField>
            <FormField name="password" hasError>
              <FormLabel required>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                hasError
              />
              <FormMessage>
                Password must be at least 8 characters.
              </FormMessage>
            </FormField>
            <FieldError message="This field is required." />
          </Stack>
        </ContentBlock>

        <ContentBlock title="Search Input" variant="card">
          <Stack gap={3}>
            <SearchInput
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue("")}
            />
            <p className="text-caption text-tertiary">
              Type something and use the clear button.
            </p>
          </Stack>
        </ContentBlock>
      </Grid>

      <SectionTitle>Feedback Components</SectionTitle>

      <Grid columns={2} gap={6}>
        <ContentBlock title="Alerts" variant="card">
          <Stack gap={3}>
            <Alert variant="info" title="Information">
              This is an informational alert.
            </Alert>
            <Alert variant="success" title="Success">
              Operation completed successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review before proceeding.
            </Alert>
            <Alert variant="error" title="Error">
              An error occurred processing your request.
            </Alert>
            <Alert variant="neutral" title="Note">
              A neutral notification message.
            </Alert>
            <Alert variant="ai" title="AI Suggestion">
              AI-powered recommendation alert.
            </Alert>
          </Stack>
        </ContentBlock>

        <ContentBlock title="Dialog" variant="card">
          <Stack gap={3}>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to
                    proceed?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-body text-secondary">
                    Dialog content area for additional context.
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={2} gap={6}>
        <ContentBlock title="Progress" variant="card">
          <Stack gap={4}>
            <SubTitle>Progress Bars</SubTitle>
            <ProgressBar value={25} variant="primary" showLabel />
            <ProgressBar value={50} variant="success" />
            <ProgressBar value={75} variant="warning" size="sm" />
            <ProgressBar value={90} variant="danger" size="lg" />
            <ProgressBar value={60} variant="ai" animated />
          </Stack>
        </ContentBlock>

        <ContentBlock title="Skeleton" variant="card">
          <Stack gap={4}>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton variant="circular" className="h-12 w-12" />
            <Skeleton variant="rectangular" className="h-24 w-full" />
            <SkeletonGroup count={1} lines={2} />
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={3} gap={6}>
        <ContentBlock title="Loading State" variant="card">
          <LoadingState message="Loading data..." />
        </ContentBlock>

        <ContentBlock title="Empty State" variant="card">
          <EmptyState
            title="No results found"
            description="Try adjusting your search or filters."
          />
        </ContentBlock>

        <ContentBlock title="Error State" variant="card">
          <ErrorState
            title="Failed to load"
            message="Unable to fetch data. Please try again."
            onRetry={() => {}}
          />
        </ContentBlock>
      </Grid>

      <SectionTitle>AI Components</SectionTitle>

      <Grid columns={2} gap={6}>
        <ContentBlock title="AI Messages" variant="card">
          <Stack gap={4}>
            <AIMessage
              role="user"
              message="What skills are most in demand for data scientists?"
            />
            <AIMessage
              role="assistant"
              message="Based on current market analysis, the top in-demand skills for data scientists include machine learning, Python, SQL, and statistical analysis."
              confidence={0.92}
            />
            <AIMessage
              role="assistant"
              message="Analyzing market trends..."
              typing
            />
          </Stack>
        </ContentBlock>

        <ContentBlock title="Thinking and Confidence" variant="card">
          <Stack gap={4}>
            <ThinkingIndicator message="Analyzing your profile" />
            <ThinkingIndicator
              variant="glow"
              message="Generating recommendations"
            />
            <Stack direction="row" gap={2} wrap="wrap">
              <ConfidenceBadge value={0.95} />
              <ConfidenceBadge value={0.72} />
              <ConfidenceBadge value={0.38} />
            </Stack>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={3} gap={6}>
        <RecommendationCard
          type="insight"
          title="Skill Gap Detected"
          description="Your profile shows a gap in cloud computing skills."
          actionLabel="View Details"
          confidence={0.88}
        />
        <RecommendationCard
          type="suggestion"
          title="Recommended Course"
          description="AWS Cloud Practitioner certification would strengthen your profile."
          actionLabel="Explore Course"
          confidence={0.76}
        />
        <RecommendationCard
          type="action"
          title="Update Your Profile"
          description="Adding your current project would improve match accuracy by 25%."
          actionLabel="Update Now"
          confidence={0.91}
        />
      </Grid>

      <SectionTitle>Layout Primitives</SectionTitle>

      <Grid columns={2} gap={6}>
        <ContentBlock title="Stack" variant="card">
          <Stack gap={3}>
            <SubTitle>Vertical Stack</SubTitle>
            <Stack gap={2}>
              <div className="rounded-md bg-primary/10 p-3 text-body text-center">
                Item 1
              </div>
              <div className="rounded-md bg-primary/10 p-3 text-body text-center">
                Item 2
              </div>
              <div className="rounded-md bg-primary/10 p-3 text-body text-center">
                Item 3
              </div>
            </Stack>
            <SubTitle>Horizontal Stack</SubTitle>
            <Stack direction="row" gap={2}>
              <div className="rounded-md bg-primary/10 p-3 text-body">A</div>
              <div className="rounded-md bg-primary/10 p-3 text-body">B</div>
              <div className="rounded-md bg-primary/10 p-3 text-body">C</div>
            </Stack>
          </Stack>
        </ContentBlock>

        <ContentBlock title="Grid" variant="card">
          <Stack gap={3}>
            <SubTitle>3 Column Grid</SubTitle>
            <Grid columns={3} gap={3}>
              <div className="rounded-md bg-neutral-100 p-4 text-body text-center dark:bg-neutral-800">
                1
              </div>
              <div className="rounded-md bg-neutral-100 p-4 text-body text-center dark:bg-neutral-800">
                2
              </div>
              <div className="rounded-md bg-neutral-100 p-4 text-body text-center dark:bg-neutral-800">
                3
              </div>
              <div className="rounded-md bg-neutral-100 p-4 text-body text-center dark:bg-neutral-800">
                4
              </div>
              <div className="rounded-md bg-neutral-100 p-4 text-body text-center dark:bg-neutral-800">
                5
              </div>
              <div className="rounded-md bg-neutral-100 p-4 text-body text-center dark:bg-neutral-800">
                6
              </div>
            </Grid>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />

      <Grid columns={2} gap={6}>
        <ContentBlock title="Section" variant="card">
          <Section
            title="Example Section"
            description="This is a section with title, description, and action."
            action={<Button size="sm">View All</Button>}
          >
            <div className="rounded-lg bg-neutral-50 p-6 text-body text-secondary dark:bg-neutral-900">
              Section content area.
            </div>
          </Section>
        </ContentBlock>

        <ContentBlock title="Content Block" variant="card">
          <Stack gap={3}>
            <ContentBlock
              title="Default Block"
              description="A default content block."
            >
              <p className="text-body">Default block content.</p>
            </ContentBlock>
            <ContentBlock
              title="Card Variant"
              description="A card-styled content block."
              variant="card"
            >
              <p className="text-body">Card variant content.</p>
            </ContentBlock>
            <ContentBlock
              title="Bordered Variant"
              variant="bordered"
              padding
            >
              <p className="text-body">Bordered variant content.</p>
            </ContentBlock>
          </Stack>
        </ContentBlock>
      </Grid>

      <Spacing />
      <Spacing />
    </Container>
  );
}
