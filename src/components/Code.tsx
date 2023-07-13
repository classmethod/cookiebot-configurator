import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import {
	TextInput, Text, Textarea, Button, Group, Stack, Collapse, CopyButton, Image, SegmentedControl
} from '@mantine/core';
import {
	IconBrandGoogle, IconCookie, IconCopy, IconCircleCheck
} from '@tabler/icons-react';
import srcScrCookiebot from '../assets/scr_cookiebot.png';
import GenerateCode from '../GenerateCode';

function validCbid(cbid: string) {
	return cbid.match(
		/^([a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12})$/
	);
}
function validGtm(gtm: string) {
	return gtm.match(
		/^((GTM)\-[A-Z0-9]{7})$/
	);
}

function Code() {
	const { t } = useTranslation();
	const [config, setConfig] = useState({
		cbid: "",
		gtm: "",
		blockmode: "auto"
	});
	const [script, setScript] = useState("");
	const [noError, setNoError] = useState(false);
	const [msgErrorCbid, setMsgErrorCbid] = useState("");
	const [msgErrorGtm, setMsgErrorGtm] = useState("");
	const [opened, { toggle }] = useDisclosure(false);

	useEffect(() => {
		setScript(GenerateCode(config))
		if(validCbid(config["cbid"]) !== null){
			setNoError(true)
			setMsgErrorCbid("")
		}else if(config["cbid"] === ""){
			setNoError(false)
			setMsgErrorCbid("")
		}else{
			setNoError(false)
			setMsgErrorCbid("Please enter valid Cookiebot domain group ID.")
		}
		if(validGtm(config["gtm"]) !== null || config["gtm"] === ""){
			setMsgErrorGtm("")
		}else{
			setMsgErrorGtm("Please enter valid GTM ID.")
		}
	},[config]);
	
	const inputChange = (targetValue: string, targetName: string) => {
		setConfig({
			...config,
			[targetName] : targetValue
		})
	};

	return (
	<>
		<TextInput
			name="cbid"
			withAsterisk
			label={t("content.cbid")}
			onChange={(e) => inputChange(e.target.value, e.target.name)}
			value={config["cbid"] || ""}
			error={msgErrorCbid}
			icon={<IconCookie size="1rem" />}
		/>
		<Stack align="flex-end" my="xl">
			<Group position="center" mb={5}>
				<Button onClick={toggle} compact variant="subtle">{t("content.wheretofind")}</Button>
			</Group>

			<Collapse in={opened}>
				<Image width={600} src={srcScrCookiebot} />
			</Collapse>
		</Stack>
		<TextInput
			name="gtm"
			label={t("content.gtmID")}
			onChange={(e) => inputChange(e.target.value, e.target.name)}
			value={config["gtm"] || ""}
			error={msgErrorGtm}
			icon={<IconBrandGoogle size="1rem" />}
			my="xl"
		/>
		<Stack my="xl" align="flex-start" spacing={2}>
			<Text size={16}>{t("content.blockMode.title")}</Text>
			<SegmentedControl
				transitionDuration={500}
				transitionTimingFunction="linear"
				onChange={(e) => inputChange(e, "blockmode")}
				defaultValue="auto"
				data={[
					{ label: t("content.blockMode.auto"), value: 'auto' },
					{ label: t("content.blockMode.manual"), value: 'manual' },
				]}
			/>
		</Stack>

		{noError && 
		<>
			<CopyButton value={script}>
				{({ copied, copy }) => (
					<Button
						color={copied ? 'teal' : 'blue'}
						rightIcon={copied ? <IconCircleCheck /> : <IconCopy /> }
						onClick={copy}>
						{copied ? 'Copied!' : 'Copy the code'}
					</Button>
				)}
			</CopyButton>

			<Textarea
				description="Copy & paste it to Cloudflare worker"
				value={script}
				minRows={50}
				my="xl"
			/>
		</>
		}
	</>
	)
}
export default Code;