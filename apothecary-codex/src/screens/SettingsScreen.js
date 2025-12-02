import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Switch, Button, Divider } from 'react-native-paper';
import { BrandColors, Typography } from '../config/theme';

export default function SettingsScreen() {
  const [offlineMode, setOfflineMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Premium Status */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Subscription Status</Title>
          <Paragraph style={styles.statusText}>Free Tier</Paragraph>
          <Button
            mode="contained"
            style={styles.upgradeButton}
            labelStyle={styles.upgradeButtonLabel}
            onPress={() => {/* Navigate to subscription */}}
          >
            Upgrade to Premium - $2.99/month
          </Button>
          <Paragraph style={styles.benefitsText}>
            Unlock planetary correspondences, energetic qualities, and browse by planet
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Data Sync */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Data & Sync</Title>
          <Paragraph style={styles.bodyText}>
            Last synced: Never
          </Paragraph>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => {/* Implement sync */}}
          >
            Sync Now
          </Button>
          <Divider style={styles.divider} />
          <List.Item
            title="Offline Mode"
            description="Use cached data when offline"
            left={props => <List.Icon icon="cloud-off-outline" color={props.color} />}
            right={() => (
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                color={BrandColors.skyBlue}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* About */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>About</Title>
          <Paragraph style={styles.bodyText}>
            Apothecary Codex v1.0.0
          </Paragraph>
          <Paragraph style={styles.bodyText}>
            An emotion-first herbal database featuring Renaissance herbalists.
          </Paragraph>
          <Divider style={styles.divider} />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon icon="shield-check" color={props.color} />}
            right={props => <List.Icon icon="chevron-right" color={props.color} />}
            onPress={() => {/* Show privacy policy */}}
          />
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon icon="file-document" color={props.color} />}
            right={props => <List.Icon icon="chevron-right" color={props.color} />}
            onPress={() => {/* Show terms */}}
          />
          <List.Item
            title="Give Feedback"
            left={props => <List.Icon icon="message-text" color={props.color} />}
            right={props => <List.Icon icon="chevron-right" color={props.color} />}
            onPress={() => {/* Open feedback */}}
          />
        </Card.Content>
      </Card>

      {/* Legal Disclaimer */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>⚠️ Important Notice</Title>
          <Paragraph style={styles.disclaimerText}>
            This app provides historical information only. Content is for educational purposes and is not medical advice.
          </Paragraph>
          <Paragraph style={styles.disclaimerText}>
            Always consult qualified healthcare professionals before using herbs for health purposes.
          </Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.cream,
  },
  card: {
    margin: 16,
    marginBottom: 0,
    marginTop: 16,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  cardTitle: {
    ...Typography.subheader,
    marginBottom: 12,
  },
  statusText: {
    ...Typography.body,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: BrandColors.goldenYellow,
    marginBottom: 12,
  },
  upgradeButtonLabel: {
    color: BrandColors.navyBlue,
    fontWeight: '600',
  },
  benefitsText: {
    ...Typography.caption,
    lineHeight: 20,
  },
  bodyText: {
    ...Typography.body,
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    borderColor: BrandColors.skyBlue,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: BrandColors.lightGray,
  },
  disclaimerText: {
    ...Typography.caption,
    lineHeight: 20,
    marginBottom: 8,
    color: BrandColors.gray,
  },
  bottomPadding: {
    height: 32,
  },
});
