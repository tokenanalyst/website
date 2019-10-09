import React from 'react';
import { Dialog, Button, Intent } from '@blueprintjs/core';

export const SimpleDialog = ({ header, body, isShown }) => (
  <Dialog isOpen={true}>
    <>
      <div className="container">
        <div className="header">{header}</div>
        <div className="body">{body}</div>
        <div className="buttons">
          <div className="button">
            <Button
              className="button"
              icon="arrow-right"
              intent={Intent.SUCCESS}
            >
              Sign Up
            </Button>
          </div>
          <div className="button">
            <Button>Later</Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 10px;
        }
        .header {
          font-size: 24px;
        }
        .body {
          padding-top: 10px;
        }
        .buttons {
          display: flex;
          justify-content: flex-end;
          padding: 10px;
        }
        .button {
          padding-left: 2px;
          padding-right: 2px;
        }
      `}</style>
    </>
  </Dialog>
);
