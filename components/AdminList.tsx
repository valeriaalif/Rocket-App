import * as React from 'react';
import { List } from 'react-native-paper';
import { Link } from "expo-router";

const AdminList = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <Link href="/Admin/addTechAcademy">
          <List.Item title="Agregar Curso Tech Academy" />
        </Link>
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
          <List.Item
    title="First Item"
    left={props => <List.Icon {...props} icon="folder" />}
  />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default AdminList;