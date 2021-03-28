import React from 'react';
import { Row, Col} from 'react-bootstrap';

function AccountInfo({account}) {
    return (
                    <>
                        <Row>
							<Col className="text-center" md={12}>
								<h1 className="pb-0">Your Actual Budget</h1>
								<h1 className="py-0">${account.actual_balance}</h1>
								<p>
									Initial Budget
									<p>${parseFloat(account.init_balance)}</p>
								</p>
							</Col>
						</Row>
						<Row>
							<Col md={4} />
							<Col md={2} className="text-center">
								<h2 className="pb-0">Your expenses</h2>
								<h2 className="py-0">${account.withdraw_sum}</h2>
							</Col>
							<Col md={2} className="text-center">
								<h2 className="pb-0">Your deposit</h2>
								<h2 className="py-0">${account.deposit_sum}</h2>
							</Col>
							<Col md={4} />
						</Row>
                    </>
    )
}

export default AccountInfo;