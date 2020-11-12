import React from "react";
import { withStyles } from "@material-ui/styles";
import { withStore } from "@spyna/react-store";
// import HomeContainer from "../containers/HomeContainer";
import TransferContainer from "../containers/TransferContainer";
import ConfirmContainer from "../containers/ConfirmContainer";
import WalletModal from "../components/WalletModal";
import ErrorModal from "../components/ErrorModal";
// import { BRIDGE_SYMBOL_MAP } from "../bridges/bridges";

const styles = () => ({});

interface Props {
  store: any;
  classes: { [key in string]: string };
}

class Bridge extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props;

    // const confirmBridge = store.get("confirmBridge");
    // const selectedBridge = store.get("selectedBridge");
    // const selectedPair = store.get("selectedPair");

    const showWalletModal = store.get("showWalletModal");
    const confirmAction = store.get("confirmAction");
    const confirmTx = store.get("confirmTx");

    const noWeb3 = store.get("noWeb3");
    const pleaseConnect = store.get("pleaseConnect");
    const insufficientBalance = store.get("insufficientBalance");
    const belowMinTxLimit = store.get("belowMinTxLimit");
    const exceedsMaxTxLimit = store.get("exceedsMaxTxLimit");

    return (
      <React.Fragment>
        {showWalletModal && <WalletModal />}

        {/* {!confirmBridge && (
          <>
            <HomeContainer
              active={
                selectedBridge ? BRIDGE_SYMBOL_MAP[selectedBridge] : "ETH"
              }
              pair={selectedPair ? BRIDGE_SYMBOL_MAP[selectedPair] : "ELA"}
              items={["ETH", "ELA"]}
              onBridgeChange={(v: string) => {
                const bridge = v.toLowerCase();
                store.set("selectedBridge", bridge);
                if (bridge === selectedPair) {
                  if (bridge === "eth") {
                    store.set("selectedPair", "ela");
                    store.set("selectedAsset", "eth");
                    // store.set("convert.selectedFormat", "elaeth");
                    store.set("convert.selectedDirection", 0);
                  }
                  if (bridge === "ela") {
                    store.set("selectedPair", "eth");
                    store.set("selectedAsset", "ela");
                    // store.set("convert.selectedFormat", "ethela");
                    store.set("convert.selectedDirection", 1);
                  }
                }
              }}
              onPairChange={(v: string) => {
                const pair = v.toLowerCase();
                store.set("selectedPair", pair);
              }}
            />
          </>
        )} */}
        {/* {confirmBridge && (
          <> */}
        {confirmTx && confirmAction ? (
          <ConfirmContainer />
        ) : (
          <TransferContainer />
        )}
        {/* </>
        )} */}

        {noWeb3 && (
          <div>
            <ErrorModal store={store} errorType={"noWeb3"} />
          </div>
        )}
        {pleaseConnect && (
          <div>
            <ErrorModal store={store} errorType={"pleaseConnect"} />
          </div>
        )}
        {insufficientBalance && (
          <div>
            <ErrorModal store={store} errorType={"insufficientBalance"} />
          </div>
        )}
        {belowMinTxLimit && (
          <div>
            <ErrorModal store={store} errorType={"belowMinTxLimit"} />
          </div>
        )}
        {exceedsMaxTxLimit && (
          <div>
            <ErrorModal store={store} errorType={"exceedsMaxTxLimit"} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStore(withStyles(styles)(Bridge));
