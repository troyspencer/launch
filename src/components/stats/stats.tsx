import * as React from 'react'
import { Launches } from './launches'
import { Timer } from './timer'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface StatsProps { 
    paused: boolean,
    launches: number
}

export const Stats = (props: StatsProps) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
            width: '100%',
            },
            heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            },
        }),
    );

    const classes = useStyles({});

    return (
    <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
              Statistics
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Launches launches={props.launches} />
            <Timer launches={props.launches} paused={props.paused} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
            
    )
}
