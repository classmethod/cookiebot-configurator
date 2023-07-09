import { useTranslation } from 'react-i18next';
import {
    createStyles, Header as MantineHeader, Container, Title, Button, Group, Image, SegmentedControl, Tooltip
} from '@mantine/core';

import srcIconCookiebot from '../assets/icon_cookiebot.svg';
import srcIconCm from '../assets/icon_classmethod_round.svg';
import srcIconGh from '../assets/icon_github.svg';

const useStyles = createStyles(() => ({
	header: {
    	borderBottom: 0,
    	marginTop: 10,
    	marginBottom: 40,
	},
	headerInner: {
		height: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerIcon: {
		padding: 4,
		height: 'auto',
	}
}))

function Header() {
    const { t, i18n } = useTranslation();
	const changeLanguageHandler = (lang: string) => {
		i18n.changeLanguage(lang)
	};
    const { classes } = useStyles();

    return (
    <>
        <MantineHeader height={50} className={classes.header}>
        	<Container size="md" className={classes.headerInner}>
        		<Group spacing={0}>
          			<Image width={50} height={50} src={srcIconCookiebot} />
          			<Title order={1} size="h4">{t("header.title")}</Title>
        		</Group>
        		<Group>
          			<SegmentedControl
						value={i18n.language}
            			onChange={(v) => changeLanguageHandler(v)}
            			data={[
            			  { label: t("header.en"), value: 'en' },
            			  { label: t("header.ja"), value: 'ja' },
            			]}
            			size="xs"
          			/>
          			<Tooltip label="Managed by Classmethod">
            			<Button variant="default" component="a" href="https://classmethod.de" target="_blank" className={classes.headerIcon}>
              				<Image width={22} height={22} src={srcIconCm} />
            			</Button>
        			</Tooltip>
        			<Tooltip label="Github Repository">
            			<Button variant="default" component="a" href="https://github.com/classmethod/cookiebot-configurator" target="_blank" className={classes.headerIcon}>
              				<Image width={22} height={22} src={srcIconGh} />
            			</Button>
          			</Tooltip>
        		</Group>
        	</Container>
      	</MantineHeader>
    </>
    )
}
export default Header;