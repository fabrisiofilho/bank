package br.com.hiven.bank.service;

import br.com.hiven.bank.entity.AccountEntity;

import java.io.ByteArrayInputStream;

public interface ReportService {

    ByteArrayInputStream createPDF(AccountEntity conta);

}
