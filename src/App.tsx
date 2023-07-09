import { useTranslation } from 'react-i18next';
import {
  MantineProvider, Text, Container, Tabs, 
} from '@mantine/core';
import {
  IconHelp, IconCode
} from '@tabler/icons-react';
import Header from './components/Header';
import Code from './components/Code';
import Instruction from './components/Instruction';

function App() {
    const { t } = useTranslation();

	return (
    <MantineProvider
    	withGlobalStyles
    	withNormalizeCSS
    	theme={{
    		components: {
    	    	Container: {
    	      		defaultProps: {
    	        		sizes: {
    	          			xs: 540,
    	          			sm: 720,
    	          			md: 860,
    	          			lg: 1140,
    	          			xl: 1320,
    	        		},
    	      		},
    	    	},
    	  	},
    	}}
    >
		<Header />

      	<Container size="md">
    		<Tabs
    			color="dark"
    			variant="outline"
    			defaultValue="code"
    			my="xl"
    		>
    			<Tabs.List>
    		    	<Tabs.Tab value="code" icon={<IconCode size="0.9rem" />}><Text size={16}>{t("tab.generate")}</Text></Tabs.Tab>
    		    	<Tabs.Tab value="howto" icon={<IconHelp size="0.9rem" />}><Text size={16}>{t("tab.howto")}</Text></Tabs.Tab>
    		  	</Tabs.List>

    			<Tabs.Panel value="code" py="xl">
    		    	<Code />
    		  	</Tabs.Panel>

    			<Tabs.Panel value="howto" py="xl">
    		    	<Instruction />
    		  	</Tabs.Panel>
    		</Tabs>
      </Container>   
    </MantineProvider>
  )
}

export default App
