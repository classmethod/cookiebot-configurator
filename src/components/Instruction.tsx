import { useTranslation } from 'react-i18next';
import {
    Title, Text, Button, Group, Stepper, List,
  } from '@mantine/core';
import {
    IconExternalLink
} from '@tabler/icons-react';

function Instruction() {
    const { t } = useTranslation();

    return (
    <>
        <Title order={2} my="xl">{t("instruction.about")}</Title>
        <Text>{t("instruction.description")}</Text>
        <Group my="md">
            <Button variant="light"  component="a" href="https://cookiebot.jp" target="_blank" rightIcon={<IconExternalLink size="1rem" />}>
                cookiebot.jp (日本語)
            </Button>
            <Button variant="light"  component="a" href="https://www.cookiebot.com/" target="_blank" rightIcon={<IconExternalLink size="1rem" />}>
                cookiebot.com (English)
            </Button>
        </Group>
        <Title order={2} my="xl">{t("instruction.steps")}</Title>
        <Stepper active={0} orientation="vertical" my="xl">
            <Stepper.Step
                label={t("instruction.step1Label")}
                description={<a href="https://manage.cookiebot.com/en/signup?rid=CLASS" target="_blank">https://manage.cookiebot.com/</a>}
            />
            <Stepper.Step
                label={t("instruction.step2Label")}
                description={t("instruction.step2Description")}
            />
            <Stepper.Step
                label={t("instruction.step3Label")}
                description={t("instruction.step3Description")}
            />
            <Stepper.Step
                label={t("instruction.step4Label")}
                description={t("instruction.step4Description")}
            />
        </Stepper>
        <Title order={2} my="xl">{t("instruction.note.title")}</Title>
        <List>
            <List.Item>{t("instruction.note.l1")}</List.Item>
            <List.Item>{t("instruction.note.l2")}</List.Item>
            <List.Item>{t("instruction.note.l3")}<br />
            <a href="https://support.cookiebot.com/hc/en-us/articles/360003793854-Google-Tag-Manager-deployment" target="_blank">{t("instruction.note.l3Link")}</a></List.Item>
        </List>
    </>
    )
}
export default Instruction;